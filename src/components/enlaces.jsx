import {
  IconBrandSkype,
  IconBrandSpeedtest,
  IconBrandWhatsapp,
  IconIcons,
} from "@tabler/icons-react";

export function Links({ display }) {
  return (
    <div
      className={`h-full w-full overflow-hidden flex flex-col items-center border-2 border-white rounded-md ${
        display ? "" : "hidden"
      }`}
    >
      <div className="bg-red-700  h-14 items-center justify-center grid grid-cols-6 grid-rows-1 w-full">
        <button
          title="Acceder"
          className="col-start-1 col-end-2 bg-red-700 h-full  w-3/4"
        ></button>

        <div className="col-start-2 col-end-6 text-xl  w-full font-bold uppercase flex justify-center items-center">
          Useful Links
        </div>
      </div>
      <div className="grid w-full p-4 items-center justify-center gap-2 grid-cols-2">
        <a
          className="bg-red-700 w-full flex items-center  gap-4 p-2 rounded-xl hover:bg-red-800"
          target="_blank"
          href="https://create.wa.link"
        >
          <IconBrandWhatsapp size={40} />
          <h1>Generador links Whatsapp</h1>
        </a>

        <a
          className="bg-red-700 w-full flex items-center  gap-4 p-2 rounded-xl hover:bg-red-800"
          target="_blank"
          href="https://pagespeed.web.dev"
        >
          <IconBrandSpeedtest size={40} />
          <h1>Test de velocidad Web</h1>
        </a>

        <a
          className="bg-red-700 w-full flex items-center  gap-4 p-2 rounded-xl hover:bg-red-800"
          target="_blank"
          href="https://tablericons.com"
        >
          <IconIcons size={40} />
          <h1>Iconos de marcas</h1>
        </a>

        <a
          className="bg-red-700 w-full flex items-center gap-4 p-2 rounded-xl hover:bg-red-800"
          target="_blank"
          href="https://svgl.app/"
        >
          <IconBrandSkype size={40} />
          <h1>Iconos</h1>
        </a>
      </div>
    </div>
  );
}
