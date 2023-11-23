interface IGradientHeading {
  title: string;
  from?: string;
  to?: string;
  heading?: 1 | 2 | 3 | 4 | 5 | 6;
}

const GradientHeading = ({ title, from, to, heading }: IGradientHeading) => {
  if (heading === 1) {
    return (
      <h1
        className={`font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r ${
          from ?? "from-purple-400"
        } ${to ?? "to-pink-600"}`}
      >
        {title}
      </h1>
    );
  }

  if (heading === 2) {
    return (
      <h2
        className={`font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r ${
          from ?? "from-purple-400"
        } ${to ?? "to-pink-600"}`}
      >
        {title}
      </h2>
    );
  }

  if (heading === 3) {
    return (
      <h3
        className={`font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r ${
          from ?? "from-purple-400"
        } ${to ?? "to-pink-600"}`}
      >
        {title}
      </h3>
    );
  }

  if (heading === 4) {
    return (
      <h4
        className={`font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r ${
          from ?? "from-purple-400"
        } ${to ?? "to-pink-600"}`}
      >
        {title}
      </h4>
    );
  }

  if (heading === 5) {
    return (
      <h5
        className={`font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r ${
          from ?? "from-purple-400"
        } ${to ?? "to-pink-600"}`}
      >
        {title}
      </h5>
    );
  }

  if (heading === 6) {
    return (
      <h6
        className={`font-extrabold text-transparent text-lg bg-clip-text bg-gradient-to-r ${
          from ?? "from-purple-400"
        } ${to ?? "to-pink-600"}`}
      >
        {title}
      </h6>
    );
  }

  return (
    <h1
      className={`font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r ${
        from ?? "from-purple-400"
      } ${to ?? "to-pink-600"}`}
    >
      {title}
    </h1>
  );
};

export default GradientHeading;
