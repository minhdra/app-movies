

function Footer() {

    return (
        <div className=" dark:bg-slate-900 m-auto text-center border-t shadow-md dark:border-slate-400 p-4 float-right w-full">
            <h1 className="text-xl font-medium font-sans">Dra Film</h1>
            <p>( ͡° ͜ʖ ͡°) Copyright ©{(new Date()).getFullYear()}: <span className="text-md font-medium">Le Minh 💖</span></p>
        </div>
    )
}

export default Footer;