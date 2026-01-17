import { Review } from '@/types';
import { Star } from 'lucide-react';
import { format } from 'date-fns';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="p-4 rounded-xl border border-border bg-card">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-medium">
          {review.user?.name.charAt(0).toUpperCase() || 'U'}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">
                {review.user?.name || 'Anonymous'}
              </h4>
              <div className="flex items-center gap-2 mt-0.5">
                {/* Rating Stars */}
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < review.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-muted text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {format(new Date(review.createdAt), 'MMM dd, yyyy')}
                </span>
              </div>
            </div>
          </div>

          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {review.comment}
          </p>
        </div>
      </div>
    </div>
  );
}
