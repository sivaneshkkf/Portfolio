import { div } from "framer-motion/client";

function Footer() {
    return ( 
        <div className="flex items-center gap-1 text-textpara dark:text-dark-textpara bg-secondary dark:bg-dark-primary py-4 justify-center">
            <div className="w-4 h-4 rounded-full flex items-center justify-center border border-textpara text-[10px]">
                <p>C</p>
            </div>
            <p className="text-xs">2024. All rights reserved</p>
        </div>
     );
}

export default Footer;