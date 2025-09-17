// IMPORTANT: Storing user data in a repository JSON file is insecure. Use a database for production.
import { requireAuth } from '../../lib/auth';
import DownloadClientComponent from './DownloadClientComponent';

export const dynamic = 'force-dynamic'; // Ensures this page is always dynamically rendered

export default async function PageX() {
  // This server-side function will check for a valid JWT cookie.
  // If the cookie is missing or invalid, it will automatically redirect to '/login'.
  await requireAuth();

  return (
    <div className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center p-4">
      <DownloadClientComponent />
    </div>
  );
}
