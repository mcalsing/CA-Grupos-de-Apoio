function Header() {
  return (
    <main className="bg-white px-5 py-2 w-full flex justify-around flex-wrap gap-2 mb-5">
      
      <section>
        <img src="/logotipo.png" alt="" />
      </section>
      
      <section className="flex gap-2 flex-wrap justify-center">
        <div className="flex gap-2 items-center">
          <label className="font-medium text-slate-800">Login:</label>
          <input className="py-[7px] px-2 border-1 border-slate-300 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent" type="text" />
        </div>
        <div className="flex gap-1 items-center">
          <label className="font-medium text-slate-800">Senha:</label>
          <input className="py-[7px] px-2 border-1 border-slate-300 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent" type="text" />
        </div>
      </section>
  
    </main>
  )
}

export default Header;