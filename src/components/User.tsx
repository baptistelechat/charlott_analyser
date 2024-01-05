import useAuthStore from "@/lib/store/auth.store";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const User = () => {
  const auth = useAuthStore((s) => s.auth);

  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col items-end">
        <p className="text-primary font-bold">
          {`${auth.userData.prenom} 
            ${auth.userData.nom}`}
        </p>
        {auth.login ? <p>({auth.login})</p> : <></>}
      </div>
      {auth.userData.image ? (
        <Avatar>
          <AvatarImage src={auth.userData.image} />
          <AvatarFallback>{`${auth.userData.prenom[0]}${auth.userData.nom[0]}`}</AvatarFallback>
        </Avatar>
      ) : (
        <></>
      )}
    </div>
  );
};

export default User;
