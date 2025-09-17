// IMPORTANT: Storing user data in a repository JSON file is insecure. Use a database for production.
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyJwt } from '../../../../lib/auth';
import { promises as fs, createReadStream } from 'fs';
import path from 'path';
import { stat } from 'fs/promises';
import { Readable } from 'stream';
import mime from 'mime-types';

export async function GET(
  request: Request,
  { params }: { params: { filename: string } }
) {
  const token = cookies().get('iam_token')?.value;
  if (!token || !verifyJwt(token)) {
    return NextResponse.json({ message: 'Authentication required.' }, { status: 401 });
  }

  const { filename } = params;

  if (!filename || typeof filename !== 'string') {
    return NextResponse.json({ message: 'Invalid filename.' }, { status: 400 });
  }

  try {
    const exclusiveFolderPath = path.join((process as any).cwd(), 'public', 'assets', 'exclusive');
    const allowedFiles = await fs.readdir(exclusiveFolderPath);
    
    // SECURITY: Prevent directory traversal by checking if the requested filename is in the allowed list.
    if (!allowedFiles.includes(filename)) {
        return NextResponse.json({ message: 'File not found or access denied.' }, { status: 404 });
    }

    const filePath = path.join(exclusiveFolderPath, filename);
    const stats = await stat(filePath);
    const stream = createReadStream(filePath);

    // Convert Node.js stream to a Web Stream
    const webStream = Readable.toWeb(stream) as ReadableStream<Uint8Array>;
    const contentType = mime.lookup(filename) || 'application/octet-stream';

    return new NextResponse(webStream, {
      status: 200,
      headers: {
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Type': contentType,
        'Content-Length': stats.size.toString(),
      },
    });

  } catch (error) {
    console.error(`Failed to download file ${filename}:`, error);
    return NextResponse.json({ message: 'File not found or could not be read.' }, { status: 404 });
  }
}