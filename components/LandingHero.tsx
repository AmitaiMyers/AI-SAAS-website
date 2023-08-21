"use client";

import {useAuth} from "@clerk/nextjs";
import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import {Button} from "./ui/button";
export const LandingHero = () => {
    const {isSignedIn} = useAuth();
    return (
        <div className="text-white font-bold py-36 text-center space-y-5">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                <h1>The Best AI Tool for</h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
                    <TypewriterComponent
                        options={{
                            strings:[
                                "Chatbot.",
                                "Code Generator.",
                                "Music Generator.",
                                "Image Generator.",
                                "Video Generator.",
                            ],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </div>
            </div>
            <div className="text-sm md:text-xl font-light text-zinc-400">
                Create content with the power of AI.
            </div>
            <div>
                <Link href={isSignedIn ? "/dashboard" : "/sing-up"}>
                    <Button variant="premium" className="md:text-lg p-4 md:p-6 founded-full font-semibold">
                    Start Generating
                    </Button>
                </Link>
            </div>
        </div>
    );
}