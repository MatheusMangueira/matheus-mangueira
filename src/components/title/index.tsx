type TitleProps = {
  title: string;
};

export const Title = ({ title }: TitleProps) => {
  return (
    <>
      <h1 className="text-xl text-gray-[#565656] underline border-b-2 border-gray-200 pb-4">
        {title}
      </h1>
    </>
  );
};
