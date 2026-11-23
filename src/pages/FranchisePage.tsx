import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Calculator, TrendingUp, Users, Crown, CheckCircle2 } from 'lucide-react';
import Footer from '../components/Footer';
import IndiaMapLocations from '../components/IndiaMapLocations';

export default function FranchisePage() {
  const [ordersPerDay, setOrdersPerDay] = useState<number>(300);
  const [aov, setAov] = useState<number>(150);
  const [foodCostPercent, setFoodCostPercent] = useState<number>(30);
  const [rent, setRent] = useState<number>(60000);
  const [salary, setSalary] = useState<number>(80000);
  const [misc, setMisc] = useState<number>(25000);
  const [totalInvestment, setTotalInvestment] = useState<number>(1800000);

  const dailyRevenue = ordersPerDay * aov;
  const monthlyRevenue = dailyRevenue * 30;
  const foodCost = monthlyRevenue * (foodCostPercent / 100); 
  const totalMonthlyExpenses = rent + salary + misc + foodCost;
  const monthlyNetProfit = monthlyRevenue - totalMonthlyExpenses;
  const roiMonths = monthlyNetProfit > 0 ? totalInvestment / monthlyNetProfit : 0;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen font-sans relative overflow-hidden">
      
      {/* 1. Hero Section (Dark) */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-dark-blue pt-24 text-white">
        <div className="absolute inset-0">
          <img src="/instagram/img5.jpg" alt="Chaiholic Cafe Setup" className="w-full h-full object-cover opacity-30 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0054]/40 via-[#0c0054]/60 to-[#0c0054]" />
        </div>
        
        {/* Background Ambience */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#D4A64A]/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#E1306C]/10 rounded-full blur-[150px] -z-10" />
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
                Build Your Own <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A64A] to-[#fde08b]">Empire</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 mb-10 font-light">
                Join India's fastest-growing premium tea cafe chain with proven profitability.
              </p>
              <button className="bg-gradient-to-r from-[#D4A64A] to-[#fde08b] text-[#0c0054] font-montserrat font-bold py-4 px-10 rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(212,166,74,0.4)] uppercase tracking-wider">
                Apply Now
              </button>
            </motion.div>
          </div>

          <div className="flex-1 w-full relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative w-full flex items-center justify-center"
            >
              <IndiaMapLocations />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Metrics & Stats (Warm Cream / Light) */}
      <section className="py-16 relative z-20 bg-[#F5F0E8] text-[#0c0054]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-2xl p-8 text-center border border-[#0c0054]/10 shadow-lg">
              <div className="text-3xl font-bold text-[#D4A64A] mb-2 drop-shadow-sm">₹14 - 22L</div>
              <div className="text-sm uppercase tracking-widest text-[#0c0054]/60 font-montserrat font-medium">Investment</div>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-2xl p-8 text-center border border-[#0c0054]/10 shadow-lg">
              <div className="text-3xl font-bold text-[#D4A64A] mb-2 drop-shadow-sm">300 - 1200</div>
              <div className="text-sm uppercase tracking-widest text-[#0c0054]/60 font-montserrat font-medium">Sq.Ft Area Req</div>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-2xl p-8 text-center border border-[#0c0054]/10 shadow-lg">
              <div className="text-3xl font-bold text-[#D4A64A] mb-2 drop-shadow-sm">Up to 85%</div>
              <div className="text-sm uppercase tracking-widest text-[#0c0054]/60 font-montserrat font-medium">Gross Margins</div>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-2xl p-8 text-center border border-[#0c0054]/10 shadow-lg">
              <div className="text-3xl font-bold text-[#D4A64A] mb-2 drop-shadow-sm">8 - 14 Mos</div>
              <div className="text-sm uppercase tracking-widest text-[#0c0054]/60 font-montserrat font-medium">Estimated ROI</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Invest (Dark Navy with Gradient) */}
      <section className="py-24 px-6 relative z-10 bg-gradient-to-b from-[#0c0054] to-[#1a0b5c] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Why Invest in Chaiholic?</h2>
            <div className="h-1 w-24 bg-[#D4A64A] mx-auto rounded-full shadow-[0_0_10px_#D4A64A]"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Crown, title: "Premium Brand Experience", desc: "A modern cinematic cafe environment that attracts a loyal customer base with a higher willingness to pay." },
              { icon: TrendingUp, title: "High Returns", desc: "Optimized operations resulting in up to 85% gross margins and incredibly fast break-even points." },
              { icon: Users, title: "End-to-End Support", desc: "We handhold our partners from site selection and interior setup, all the way to staff training and marketing." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-card rounded-[2rem] p-10 border border-white/20 shadow-premium relative group overflow-hidden bg-white/5"
              >
                <div className="absolute inset-0 image-glare opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <item.icon className="w-12 h-12 text-[#D4A64A] mb-6 drop-shadow-[0_0_15px_rgba(212,166,74,0.5)]" />
                <h3 className="text-2xl font-bold mb-4 font-serif">{item.title}</h3>
                <p className="text-white/70 leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support You Get (Warm Cream / Soft White) */}
      <section className="py-24 bg-[#F8FAFC] text-[#0c0054]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-[3rem] p-8 lg:p-16 border border-[#0c0054]/10 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Support You Get</h2>
                  <div className="h-1 w-24 bg-[#D4A64A] rounded-full shadow-[0_0_10px_#D4A64A]"></div>
                </div>
                <div className="space-y-6">
                  {[
                    { title: "Location & Interior Setup", desc: "Expert guidance on finding high-footfall locations and complete 3D turnkey interior execution." },
                    { title: "Staff Recruitment & Training", desc: "We provide extensive SOPs and train your baristas to maintain the authentic Chaiholic taste." },
                    { title: "Supply Chain Logistics", desc: "Seamless logistics for raw materials to ensure consistent quality and maximum margins." }
                  ].map((s, i) => (
                    <div key={i} className="flex items-start gap-5 group">
                      <CheckCircle2 className="w-8 h-8 text-[#2B5C8F] shrink-0 group-hover:scale-110 transition-transform" />
                      <div>
                        <h4 className="text-xl font-bold mb-2 text-[#0c0054]">{s.title}</h4>
                        <p className="text-[#0c0054]/70 font-light leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img src="/instagram/img6.jpg" alt="Authentic Chaiholic Experience" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0054]/60 to-transparent mix-blend-multiply" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive ROI Calculator (Dark Background for contrast) */}
      <section className="py-24 relative bg-[#0c0054] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Illustrative Business Model</h2>
            <div className="h-1 w-24 bg-[#D4A64A] mx-auto rounded-full shadow-[0_0_10px_#D4A64A]"></div>
            <p className="text-white/60 mt-6 max-w-2xl mx-auto font-light">Use the sliders below to estimate your potential returns. Figures are indicative and vary by location.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Controls (Solid White Panel) */}
            <div className="lg:col-span-7 space-y-8 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl text-[#0c0054]">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Calculator className="text-[#D4A64A]" /> Adjust Parameters
              </h3>
              
              {[
                { label: "Orders Per Day", val: ordersPerDay, setter: setOrdersPerDay, min: 50, max: 1000, step: 10, format: (v: number) => v },
                { label: "Average Order Value (AOV)", val: aov, setter: setAov, min: 100, max: 500, step: 10, format: formatCurrency },
                { label: "Food Cost (% of Revenue)", val: foodCostPercent, setter: setFoodCostPercent, min: 15, max: 50, step: 1, format: (v: number) => `${v}% (${formatCurrency(monthlyRevenue * (v / 100))})` },
                { label: "Monthly Rent", val: rent, setter: setRent, min: 20000, max: 250000, step: 5000, format: formatCurrency },
                { label: "Staff Salaries", val: salary, setter: setSalary, min: 30000, max: 200000, step: 5000, format: formatCurrency },
                { label: "Misc Expenses", val: misc, setter: setMisc, min: 5000, max: 80000, step: 1000, format: formatCurrency },
                { label: "Total Capital Investment", val: totalInvestment, setter: setTotalInvestment, min: 1000000, max: 3000000, step: 100000, format: formatCurrency }
              ].map((control, i) => (
                <div key={i} className="relative group">
                  <div className="flex justify-between mb-3">
                    <label className="font-montserrat font-medium text-[#0c0054]/80">{control.label}</label>
                    <span className="font-bold text-[#0c0054] bg-[#F5F0E8] px-3 py-1 rounded-lg border border-[#D4A64A]/30">
                      {control.format(control.val)}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min={control.min} 
                    max={control.max} 
                    step={control.step} 
                    value={control.val} 
                    onChange={(e) => control.setter(Number(e.target.value))} 
                    className="w-full h-2 bg-[#0c0054]/10 rounded-lg appearance-none cursor-pointer accent-[#D4A64A] hover:accent-[#2B5C8F] transition-all" 
                  />
                </div>
              ))}
            </div>

            {/* Output Panel (Deep Premium Glass) */}
            <div className="lg:col-span-5 glass-card-dark bg-[#1a0b5c] p-8 md:p-12 rounded-[2.5rem] border border-[#D4A64A]/30 shadow-[0_0_50px_rgba(212,166,74,0.15)] relative overflow-hidden h-full flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A64A]/20 blur-[80px] rounded-full pointer-events-none" />
              
              <h3 className="text-2xl font-bold mb-10 text-[#D4A64A] font-serif">Projected Returns</h3>
              
              <div className="space-y-8 relative z-10">
                <div className="pb-6 border-b border-white/10">
                  <p className="text-white/60 mb-2 font-montserrat uppercase tracking-wider text-sm">Monthly Revenue</p>
                  <p className="text-4xl font-bold">{formatCurrency(monthlyRevenue)}</p>
                </div>
                <div className="pb-6 border-b border-white/10">
                  <div className="flex justify-between items-baseline mb-2">
                    <p className="text-white/60 font-montserrat uppercase tracking-wider text-sm">Total Monthly Expenses</p>
                    <p className="text-3xl font-bold text-red-300/80">{formatCurrency(totalMonthlyExpenses)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-white/50 pt-2 font-mono">
                    <div>• Food Cost: {formatCurrency(foodCost)}</div>
                    <div>• Rent: {formatCurrency(rent)}</div>
                    <div>• Staff Salaries: {formatCurrency(salary)}</div>
                    <div>• Misc Expenses: {formatCurrency(misc)}</div>
                  </div>
                </div>
                <div className="pb-6 border-b border-[#D4A64A]/30">
                  <p className="text-[#D4A64A]/80 mb-2 font-montserrat uppercase tracking-wider text-sm">Estimated Net Profit (Monthly)</p>
                  <p className="text-5xl font-bold text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.4)]">{formatCurrency(monthlyNetProfit)}</p>
                </div>
                <div className="pt-2">
                  <p className="text-white/60 mb-3 font-montserrat uppercase tracking-wider text-sm">Estimated ROI Period</p>
                  <div className="flex items-baseline gap-3">
                    <p className="text-6xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                      {monthlyNetProfit > 0 ? roiMonths.toFixed(1) : '∞'}
                    </p>
                    <p className="text-2xl text-white/70 font-light">Months</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories & Form */}
      <section className="py-24 relative overflow-hidden bg-[#F5F0E8] text-[#0c0054]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <div className="space-y-8">
            <div className="mb-12">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Partner Success</h2>
              <div className="h-1 w-24 bg-[#D4A64A] rounded-full shadow-[0_0_10px_#D4A64A]"></div>
            </div>
            
            {[
              { name: "Rahul Sharma", role: "Gurugram Outlet Owner", quote: "I recovered my entire investment within 10 months. The support from the core team is unmatched and the brand pull is real.", img: "/instagram/img1.jpg" },
              { name: "Priya Desai", role: "Pune Outlet Owner", quote: "Coming from a non-F&B background, I was nervous. But their turnkey setup made it entirely hassle-free.", img: "/instagram/img2.jpg" }
            ].map((story, i) => (
              <motion.div whileHover={{ scale: 1.02 }} key={i} className="bg-white rounded-3xl p-8 border border-[#0c0054]/10 shadow-lg flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                <div className="w-24 h-24 shrink-0 rounded-full overflow-hidden border-[3px] border-[#D4A64A] shadow-[0_0_15px_rgba(212,166,74,0.4)]">
                  <img src={story.img} alt={story.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-1">{story.name}</h4>
                  <p className="text-[#2B5C8F] mb-3 text-sm font-montserrat uppercase tracking-wider font-semibold">{story.role}</p>
                  <p className="text-[#0c0054]/70 italic font-light leading-relaxed">"{story.quote}"</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-[#0c0054] text-white p-10 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A64A]/10 blur-[80px] rounded-full pointer-events-none" />
            <h3 className="text-3xl font-serif font-bold mb-8 text-center">Take The First Step</h3>
            <form className="space-y-6 relative z-10" onSubmit={(e) => { e.preventDefault(); alert('Application Submitted!'); }}>
              <input type="text" placeholder="Full Name" required className="w-full bg-white/5 border border-white/20 rounded-2xl px-6 py-5 text-white placeholder-white/50 focus:outline-none focus:border-[#D4A64A] focus:bg-white/10 transition-all" />
              <input type="tel" placeholder="Mobile Number" required className="w-full bg-white/5 border border-white/20 rounded-2xl px-6 py-5 text-white placeholder-white/50 focus:outline-none focus:border-[#D4A64A] focus:bg-white/10 transition-all" />
              <input type="text" placeholder="City of Interest" required className="w-full bg-white/5 border border-white/20 rounded-2xl px-6 py-5 text-white placeholder-white/50 focus:outline-none focus:border-[#D4A64A] focus:bg-white/10 transition-all" />
              <select className="w-full bg-[#11053b] border border-white/20 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-[#D4A64A] appearance-none">
                <option value="" disabled selected>Investment Budget</option>
                <option value="15L-25L">₹15 Lakhs - ₹25 Lakhs</option>
                <option value="25L-50L">₹25 Lakhs - ₹50 Lakhs</option>
                <option value="50L+">₹50 Lakhs +</option>
              </select>
              <button type="submit" className="w-full bg-gradient-to-r from-[#D4A64A] to-[#fde08b] text-[#0c0054] font-bold font-montserrat uppercase tracking-widest py-5 rounded-2xl hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(212,166,74,0.4)] mt-4">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
