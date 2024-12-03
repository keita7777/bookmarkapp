import { IoIosArrowForward } from "react-icons/io";

type BreadcrumbItem = { id: string; name: string };

type Props = {
  breadcrumbData: BreadcrumbItem[] | null;
};

const Breadcrumb = ({ breadcrumbData }: Props) => {
  return (
    <div className="mb-2 py-4 flex justify-start items-center gap-2 overflow-x-auto">
      <p className="text-xs px-2 py-1 rounded-md bg-gray-500 text-white flex justify-center items-center shrink-0">
        表示中のフォルダ
      </p>
      <ol className="flex shrink-0">
        {breadcrumbData &&
          breadcrumbData.map((item, index, array) => (
            <li key={item.id} className="flex justify-center items-center">
              <a
                href={item.id}
                className={`underline hover:no-underline ${
                  index === array.length - 1 && "no-underline pointer-events-none"
                }`}
              >
                {item.name}
              </a>
              {index < array.length - 1 && <IoIosArrowForward className="mx-2" />}
            </li>
          ))}
      </ol>
    </div>
  );
};

export default Breadcrumb;
