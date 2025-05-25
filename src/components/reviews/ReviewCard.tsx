
import Image from 'next/image';
import type { Review } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { format } from 'date-fns';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <Card className="bg-card shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-border">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={review.avatar} alt={review.author} data-ai-hint="person avatar" />
            <AvatarFallback>{review.author.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-base font-medium">{review.author}</CardTitle>
            <p className="text-xs text-muted-foreground">
              {format(new Date(review.date), 'MMMM d, yyyy')}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < review.rating ? 'text-primary fill-primary' : 'text-muted-foreground/50'}`}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-sm text-foreground">{review.comment}</p>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
