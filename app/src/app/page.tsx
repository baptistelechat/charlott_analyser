import AuthForm from "@/components/AuthForm";
import GradientHeading from "@/components/GradientHeading";

const Home = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4">
      <GradientHeading title="Charlott'" />
      <div className="w-1/4">
        <AuthForm />
      </div>
    </div>
  );
};

export default Home;
