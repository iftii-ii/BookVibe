import BannerPage from "@/components/homepage/banner";
import BooksPage from "@/components/homepage/Books";

export default function Home() {
  return (
    <div>
      <BannerPage />
      <BooksPage limit={3} showViewMore />
    </div>
  );
}

