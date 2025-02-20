import Link from "next/link";

export function PublierAnnonceLink() {
  return (
    <Link
      href="/recruiter/annonces/create-annonce"
      className="mt-2 bg-primaryHex-500 text-white px-4 py-2 rounded-md"
    >
      Publier une annonce
    </Link>
  );
}
