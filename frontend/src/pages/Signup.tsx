import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthService } from "../services/AuthService";
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // State
  const [step, setStep] = useState<1 | 2>(1);
  const [gsm, setGsm] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert("Şifreler eşleşmiyor.");
      return;
    }
    
    setIsLoading(true);
    const response = await AuthService.register(gsm, password);
    setIsLoading(false);

    if (response.success) {
      setStep(2); // Proceed to OTP verification step
    } else {
      alert(response.message || "Kayıt olurken bir hata oluştu.");
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Verify OTP
    const verifyRes = await AuthService.verify(gsm, otp);
    
    if (verifyRes.success) {
      // Auto login after successful verification
      const loginRes = await AuthService.login(gsm, password);
      setIsLoading(false);
      
      if (loginRes.success && loginRes.accessToken && loginRes.refreshToken) {
        login(loginRes.accessToken, loginRes.refreshToken);
        navigate("/dashboard");
      } else {
        alert("Kayıt başarılı ancak giriş yapılamadı. Lütfen giriş yap sayfasından tekrar deneyin.");
        navigate("/login");
      }
    } else {
      setIsLoading(false);
      alert(verifyRes.message || "Doğrulama kodu hatalı.");
    }
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center relative overflow-hidden text-on-background">
      {/* Dekoratif Arka Plan Elemanları */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary-fixed/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-tertiary-fixed/30 rounded-full blur-3xl pointer-events-none"></div>

      {/* Ana İçerik Konteynırı */}
      <div className="relative w-full max-w-md px-container-padding-mobile md:px-0 z-10">
        <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(0,14,94,0.05)] overflow-hidden border border-surface-variant/50">
          
          {/* Header / Logo Alanı */}
          <div className="pt-stack-lg px-stack-lg pb-stack-sm flex flex-col items-center">
            <img
             alt="SağlıkCell Logo"
             className="h-35 w-auto mb-stack-md object-contain"
             src="/logo.png" 
            />
            <h1 className="text-headline-md font-headline-md text-on-surface text-center">
              {step === 1 ? "Yeni Hesap Oluştur" : "Hesabınızı Doğrulayın"}
            </h1>
            <p className="text-body-md font-body-md text-on-surface-variant text-center mt-base">
              {step === 1 ? "Sağlık serüveninize hemen başlayın." : "Cebinize gelen 4 haneli kodu girin."}
            </p>
          </div>

          {/* Form Alanı */}
          <div className="p-stack-lg pt-stack-md">
            {step === 1 ? (
              <form onSubmit={handleRegister} className="flex flex-col gap-stack-md">
                {/* GSM Input */}
                <div>
                  <label className="block text-label-md font-label-md text-on-surface-variant mb-base" htmlFor="gsm-input">
                    GSM Numarası
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-on-surface-variant material-symbols-outlined pointer-events-none select-none">
                      smartphone
                    </span>
                    <input
                      className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-lg font-body-lg text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline"
                      id="gsm-input"
                      placeholder="5XX XXX XX XX"
                      type="tel"
                      value={gsm}
                      onChange={(e) => setGsm(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-label-md font-label-md text-on-surface-variant mb-base" htmlFor="password-input">
                    Şifre
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-on-surface-variant material-symbols-outlined pointer-events-none select-none">
                      lock
                    </span>
                    <input
                      className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-lg font-body-lg text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline"
                      id="password-input"
                      placeholder="En az 6 karakter"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                {/* Password Confirm Input */}
                <div>
                  <label className="block text-label-md font-label-md text-on-surface-variant mb-base" htmlFor="password-confirm-input">
                    Şifre Tekrarı
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-on-surface-variant material-symbols-outlined pointer-events-none select-none">
                      lock
                    </span>
                    <input
                      className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-lg font-body-lg text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline"
                      id="password-confirm-input"
                      placeholder="Şifrenizi tekrar girin"
                      type="password"
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-stack-sm w-full bg-secondary-container hover:bg-secondary-fixed-dim text-on-secondary-container rounded-lg py-3 px-4 flex items-center justify-center gap-2 transition-colors duration-200 shadow-[0_4px_12px_rgba(255,195,16,0.2)] active:scale-[0.98] disabled:opacity-70"
                >
                  <span className="text-body-lg font-body-lg font-bold">
                    {isLoading ? "İşleniyor..." : "Kayıt Ol"}
                  </span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    arrow_forward
                  </span>
                </button>

                <div className="text-center mt-4">
                  <span className="text-body-md text-on-surface-variant">Zaten hesabınız var mı? </span>
                  <Link to="/login" className="text-primary font-semibold hover:underline">
                    Giriş Yap
                  </Link>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerify} className="flex flex-col gap-stack-md">
                {/* OTP Input */}
                <div>
                  <label className="block text-label-md font-label-md text-on-surface-variant mb-base" htmlFor="otp-input">
                    Doğrulama Kodu
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-on-surface-variant material-symbols-outlined pointer-events-none select-none">
                      pin
                    </span>
                    <input
                      className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-lg font-body-lg text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all tracking-widest placeholder:text-outline"
                      id="otp-input"
                      maxLength={4}
                      placeholder="XXXX"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </div>
                  <p className="text-label-md font-label-md text-outline mt-base">Demo Doğrulama Kodu: 1234</p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-stack-sm w-full bg-secondary-container hover:bg-secondary-fixed-dim text-on-secondary-container rounded-lg py-3 px-4 flex items-center justify-center gap-2 transition-colors duration-200 shadow-[0_4px_12px_rgba(255,195,16,0.2)] active:scale-[0.98] disabled:opacity-70"
                >
                  <span className="text-body-lg font-body-lg font-bold">
                    {isLoading ? "Doğrulanıyor..." : "Doğrula & Başla"}
                  </span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                </button>
              </form>
            )}
          </div>

          {/* Alt Dekoratif Çizgi */}
          <div className="h-1 w-full bg-gradient-to-r from-primary via-primary-container to-secondary-container"></div>
        </div>

        {/* Güvenlik Footer */}
        <div className="mt-stack-lg flex items-center justify-center gap-2 text-label-md font-label-md text-on-surface-variant opacity-80">
          <span className="material-symbols-outlined text-[16px]">lock</span>
          <span>Güvenli Kayıt Altyapısı</span>
        </div>
      </div>
    </div>
  );
}
