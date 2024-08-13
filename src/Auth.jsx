import { useState } from "react";
import { supabase } from "./lib/supabaseClient";
import Button from "./components/input/Button";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (event) => {
    // event.preventDefault()

    setLoading(true);
    // const { error } = await supabase.auth.signInWithOtp({ email })
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: import.meta.env.VITE_SUPABASE_URL + `/auth/v1/callback`,
      },
    });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      alert("Check your email for the login link!");
    }
    setLoading(false);
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="max-w-screen-md p-6">
        <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden grid grid-cols-1 sm:grid-cols-2">
          <div
            className="w-full flex flex-col gap-6 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url(" +
                `https://blog.kotsovolos.gr/wp-content/uploads/2021/12/mouse.png` +
                ")",
            }}></div>
          <div className="p-12 flex flex-col gap-6">
            <div className="text-3xl dark:text-white font-bold sm:text-4xl">
              We're just trying to play some games!
            </div>
            <div className="text-sm dark:text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
            <div className="text-sm dark:text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </div>
            <hr className="dark:border-gray-800" />
            <Button
              disabled={loading}
              text={loading ? "Loading" : "Login with Discord"}
              fullWidth={false}
              onClick={handleLogin}
              color="primary"
            />
            <div className="text-xs text-center dark:text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
