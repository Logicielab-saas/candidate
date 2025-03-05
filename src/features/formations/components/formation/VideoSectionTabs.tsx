import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CourseReview } from "@/core/interfaces";
import { ReviewsSection } from "../reviews/ReviewsSection";
import { tabsListStyles, tabTriggerStyles } from "@/core/styles/tabs";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";

interface VideoSectionTabsProps {
  currentVideoDescription: string | undefined;
  reviews: CourseReview[];
  courseId: string;
}

export function VideoSectionTabs({
  currentVideoDescription,
  reviews,
  courseId,
}: VideoSectionTabsProps) {
  // URL state management for active tab
  const [activeTab, setActiveTab] = useQueryState<string>("tab", {
    defaultValue: "description",
    parse: (value) => value || "description",
  });

  return (
    <Tabs
      defaultValue={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList
        className={cn(
          tabsListStyles.base,
          tabsListStyles.wrapper,
          "grid grid-cols-2"
        )}
      >
        <TabsTrigger value="description" className={tabTriggerStyles.base}>
          Description
        </TabsTrigger>
        <TabsTrigger value="reviews" className={tabTriggerStyles.base}>
          Reviews
        </TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="mt-5">
        {currentVideoDescription}
      </TabsContent>
      <TabsContent value="reviews" className="mt-5">
        <ReviewsSection courseId={courseId} initialReviews={reviews} />
      </TabsContent>
    </Tabs>
  );
}
