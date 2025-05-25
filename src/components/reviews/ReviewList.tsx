
import type { Review } from '@/types';
import ReviewCard from './ReviewCard';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList = ({ reviews }: ReviewListProps) => {
  if (!reviews || reviews.length === 0) {
    return <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>;
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
