/**
 * MyReviewsContainer - Main container for user reviews page
 *
 * Server component that combines the header and reviews list
 */

import { MyReviewsHeader } from "./MyReviewsHeader";
import { UserReviewsList } from "./UserReviewsList";
import { companyReviews } from "@/core/mockData/company";
import { MOCK_USER } from "@/core/mockData/user";

export function MyReviewsContainer() {
  // Filter reviews for the current user
  const userReviews = companyReviews.filter(
    (review) => review.userId === MOCK_USER.id
  );

  return (
    <div className="container max-w-5xl py-8 space-y-8">
      <MyReviewsHeader totalReviews={userReviews.length} />
      <UserReviewsList initialReviews={userReviews} />
    </div>
  );
}
