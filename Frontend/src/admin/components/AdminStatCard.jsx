function AdminStatCard({
  title,
  value,
  subtitle,
  icon,
  iconClass = "bg-emerald-100 text-emerald-700",
}) {

  return (

    <div className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      border-slate-100
      bg-white
      p-6
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
    ">

      {/* TOP LINE */}

      <div className="
        absolute
        left-0
        top-0
        h-1
        w-full
        bg-gradient-to-r
        from-emerald-500
        to-green-500
      " />


      <div className="
        flex
        items-start
        justify-between
        gap-4
      ">

        <div>

          <p className="
            text-sm
            font-semibold
            text-slate-500
          ">
            {title}
          </p>


          <h3 className="
            mt-2
            text-3xl
            font-black
            tracking-tight
            text-slate-900
          ">
            {value}
          </h3>


          {subtitle && (

            <p className="
              mt-2
              text-xs
              font-medium
              text-slate-400
            ">
              {subtitle}
            </p>

          )}

        </div>


        <div className={`
          flex
          h-13
          w-13
          shrink-0
          items-center
          justify-center
          rounded-2xl
          text-xl
          transition
          duration-300
          group-hover:scale-110
          ${iconClass}
        `}>

          {icon}

        </div>

      </div>

    </div>

  );

}


export default AdminStatCard;