import { useTranslations } from "next-intl";
import Link from "next/link";

type TitleProps = {
  title: string;
  goBack?: boolean;
};

export const Title = ({ title, goBack }: TitleProps) => {
  const t = useTranslations('guide');

  return (
    <div className="w-full md:flex md:items-center justify-between p-2 border-b-2 border-gray-200 pb-4">
      <h1 className="text-xl text-gray-[#565656] underline ">
        {title}
      </h1>
      {goBack && (
        <Link href={"/"}>
          <p className="text-gray-400 underline text-lg ">
            {t("1")}
          </p>
        </Link>
      )}
    </div>
  );
};
