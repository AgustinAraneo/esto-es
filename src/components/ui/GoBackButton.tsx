import { LeftArrowIcon } from "@/icons/LeftArrowIcon"
import Link from "next/link"

interface Props {
    title: string
}

export const GoBackButton = ({ title }: Props) => {
    return (
        <div className="flex items-center gap-2 px-4 border-t-[1px] border-b-[1px] py-1 border-bordes bg-white">
            <Link href={'/'}>
                <div className="flex items-center gap-2">
                    <LeftArrowIcon />
                    <h4 className="text-sub-titulos text-[12px] leading-[22px] font-[400]">Back</h4>
                </div>
            </Link>
            <h2 className="text-titulos text-[16px] leading-8 font-[600]">{title}</h2>
        </div>
    )
}

