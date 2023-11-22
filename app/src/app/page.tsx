import AuthForm from "@/components/AuthForm";

const Home = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4">
      <h1 className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Charlott'
      </h1>
      <div className="w-1/4">
        <AuthForm />
      </div>
    </div>
  );
};

export default Home;
