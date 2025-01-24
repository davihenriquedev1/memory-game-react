type Props = {
    label:string,
    value:string
}

export default function InfoItem ({label, value} : Props) {
    return (
        <div className="my-5">
            <div className="text-base text-gray-500">{label}</div>
            <div className="text-4xl font-bold text-slate-800">{value}</div>
        </div>  
    )
}