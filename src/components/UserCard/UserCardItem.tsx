import { Skeleton } from "../ui/skeleton";

interface IUserCardItemProps {
  title?: string;
  value: string;
}

const UserCardItem = (props: IUserCardItemProps) => {
  return (
    <div>
      <div className="flex items-center gap-1">
        <p className="font-bold">{props.title ? `${props.title} :` : ""}</p>
        {props.value ? (
          <p>{props.value}</p>
        ) : (
          <Skeleton
            className={`${
              props.title ? "w-1/3" : "w-full"
            } h-[1rem] rounded-full ${
              props.value || props.title ? "" : "mt-2"
            }`}
          />
        )}
      </div>
    </div>
  );
};

export default UserCardItem;
