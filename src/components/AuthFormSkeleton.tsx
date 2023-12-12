import { Skeleton } from "@ui/skeleton";

const AuthFormSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="w-[100px] h-[20px] rounded-lg" />
      <Skeleton className="w-full h-[40px] rounded-lg" />
      <Skeleton className="w-[100px] h-[20px] rounded-lg" />
      <Skeleton className="w-full h-[40px] rounded-lg" />
      <Skeleton className="w-[120px] h-[40px] rounded-lg" />
    </div>
  );
};

export default AuthFormSkeleton;
