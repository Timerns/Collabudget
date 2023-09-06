export default function Team() {
    return (
        <div className={"grid md:grid-cols-4"}>
            <div className={"col-span-1 mb-6"}>
                <img src={"/web/user1.png"} className={"w-1/2 mx-auto mb-3"}/>
                <h3 className={"text-lg"}>Tim Ernst</h3>
                <h3 className={"text-lg"}>Ingénierie des données</h3>
                <h4 className={"text-sm"}>tim.ersnt@heig-vd.ch</h4>
            </div>
            <div className={"col-span-1 mb-6"}>
                <img src={"/team/eric.jpg"} className={"w-48 h-48 object-cover mx-auto mb-3 rounded-full"}/>
                <h3 className={"text-lg"}>Eric Peronetti</h3>
                <h3 className={"text-lg"}>Ingénierie logicielle</h3>
                <h4 className={"text-sm"}>eric.peronetti@heig-vd.ch</h4>
            </div>
            <div className={"col-span-1 mb-6"}>
                <img src={"/web/user1.png"} className={"w-1/2 mx-auto mb-3"}/>
                <h3 className={"text-lg"}>Grégory Rey-Mermet</h3>
                <h3 className={"text-lg"}>Ingénierie des données</h3>
                <h4 className={"text-sm"}>gregory.rey-mermet@heig-vd.ch</h4>
            </div>
            <div className={"col-span-1 mb-6"}>
                <img src={"/team/mario.jpg"} className={"w-48 h-48 object-cover mx-auto mb-3 rounded-full"}/>
                <h3 className={"text-lg"}>Mario Amos</h3>
                <h3 className={"text-lg"}>Ingénierie des données</h3>
                <h4 className={"text-sm"}>mario.amos@heig-vd.ch</h4>
            </div>
        </div>
    )
}