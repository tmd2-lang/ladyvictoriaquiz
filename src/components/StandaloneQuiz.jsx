import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, X } from 'lucide-react';

export default function StandaloneQuiz({ onBack }) {
    const [step, setStep] = useState(0);
    const [score, setScore] = useState(0);
    const [isCalculating, setIsCalculating] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Scroll to top on step change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [step]);

    const questions = [
        {
            id: 'guests',
            question: "How many guests are you expecting?",
            options: [
                { label: "Under 75", points: 5 },
                { label: "75–125", points: 10 },
                { label: "125–200", points: 18 },
                { label: "200–300", points: 25 },
                { label: "300+", points: 35 }
            ]
        },
        {
            id: 'venue',
            question: "Tell us about your venue.",
            options: [
                { label: "Outdoor garden, estate, or vineyard", points: 5 },
                { label: "Historic mansion or boutique venue", points: 8 },
                { label: "Hotel ballroom", points: 12 },
                { label: "Industrial loft, warehouse, or modern space", points: 15 },
                { label: "Tent or private property / blank canvas", points: 18 }
            ]
        },
        {
            id: 'floralStyle',
            question: "Which floral style speaks to you?",
            options: [
                { label: "Clean & minimal — bud vases, greenery, candlelight", points: 5 },
                { label: "Classic & elegant — structured arrangements, timeless blooms", points: 10 },
                { label: "Lush & romantic — full garden-style, lots of texture and movement", points: 18 },
                { label: "Dramatic & immersive — statement installations, floral walls, ceiling pieces", points: 28 }
            ]
        },
        {
            id: 'ceremony',
            question: "What's your dream ceremony look?",
            options: [
                { label: "Keep it simple — the venue speaks for itself", points: 3 },
                { label: "A beautiful arch or backdrop with florals", points: 8 },
                { label: "Full ceremony design — arch, aisle florals, styled details", points: 15 },
                { label: "A showstopper — entrance statement, aisle meadows, hanging florals", points: 25 }
            ]
        },
        {
            id: 'reception',
            question: "How do you envision your reception tables?",
            options: [
                { label: "Simple and sweet — low arrangements, candles, clean lines", points: 5 },
                { label: "Mixed heights — low and tall centerpieces with candle accents", points: 12 },
                { label: "Full tablescapes — elevated florals, chargers, specialty linens", points: 20 },
                { label: "Over-the-top — floral runners, hanging pieces, every detail curated", points: 30 }
            ]
        },
        {
            id: 'styling',
            question: "Beyond florals, how styled do you want your wedding to feel?",
            options: [
                { label: "Minimal — we'll use what the venue provides", points: 3 },
                { label: "Some accent pieces — lounge area, sweetheart chairs, signage", points: 8 },
                { label: "Curated throughout — specialty furniture, styled bars, tabletop details", points: 15 },
                { label: "Fully produced — every visual element designed by our team", points: 22 }
            ]
        },
        {
            id: 'lighting',
            question: "How important is lighting and atmosphere?",
            options: [
                { label: "We'll work with the venue's existing lighting", points: 0 },
                { label: "Some uplighting or pin spots to set the mood", points: 5 },
                { label: "Meaningful lighting design — drapery, ambient lighting, candle installations", points: 12 },
                { label: "Full production — custom lighting, drapery, dance floor wraps, stage design", points: 22 }
            ]
        },
        {
            id: 'bridalParty',
            question: "Tell us about your bridal party.",
            options: [
                { label: "Just the two of us (or very small — 1-2 attendants)", points: 2 },
                { label: "Modest (3–5 on each side)", points: 5 },
                { label: "Large (6–8 on each side)", points: 8 },
                { label: "Grand (9+ on each side, plus family florals)", points: 12 }
            ]
        },
        {
            id: 'tableShape',
            question: "What shape are your reception tables?",
            options: [
                { label: "Mostly round tables (classic, efficient)", points: 2 },
                { label: "A mix of rounds and long tables", points: 6 },
                { label: "All long/king's tables (lush runners all the way down)", points: 14 }
            ]
        },
        {
            id: 'roomFlip',
            question: "Does your venue require a 'room flip'?",
            options: [
                { label: "No, the ceremony and reception are in separate spaces", points: 0 },
                { label: "Yes, we have to flip the room during cocktail hour", points: 8 }
            ]
        },
        {
            id: 'weekendEvents',
            question: "Are we flowering any other weekend events?",
            options: [
                { label: "No, just the wedding day", points: 0 },
                { label: "Yes, a rehearsal dinner or welcome party", points: 10 },
                { label: "Yes, a full weekend (welcome party, rehearsal, and farewell brunch)", points: 25 }
            ]
        }
    ];

    // Array to track score history for 'back' functionality
    const [scoreHistory, setScoreHistory] = useState([]);

    const handleSelection = (points) => {
        setScoreHistory(prev => [...prev, score]);
        const newScore = score + points;
        setScore(newScore);

        if (step < questions.length - 1) {
            setStep(prev => prev + 1);
        } else {
            setIsCalculating(true);
            setStep('results');
            setTimeout(() => {
                setIsCalculating(false);
            }, 2000); // 2 second mock calculation
        }
    };

    const handleBack = () => {
        if (step > 0 && typeof step === 'number') {
            setStep(prev => prev - 1);
            const prevScore = scoreHistory[scoreHistory.length - 1];
            setScore(prevScore);
            setScoreHistory(prev => prev.slice(0, -1));
        } else if (step === 0) {
            onBack();
        }
    };

    const calculateResult = () => {
        // Total possible points is now roughly 221
        // Min possible is 28
        
        if (score <= 40) return { 
            range: "$8,000 – $10,500", 
            tier: "The Essentials — Intimate",
            message: "Your vision is beautifully focused. With cohesive florals and thoughtful details, Irene will bring your day to life with elegance and intention." 
        };
        if (score <= 55) return { 
            range: "$10,500 – $13,500", 
            tier: "The Essentials — Standard",
            message: "You want more than just flowers — you want a feeling. This tier gives Irene room to design a polished, layered experience your guests will remember." 
        };
        if (score <= 70) return { 
            range: "$13,500 – $17,000", 
            tier: "Elevated Essentials",
            message: "A perfect balance of scale and detail. We will design key focal moments while ensuring your guest tables feel lush and romantic." 
        };
        if (score <= 85) return { 
            range: "$17,000 – $21,000", 
            tier: "Custom Design — Moderate",
            message: "Your wedding calls for custom artistry. Expect lush arrangements, curated rentals, and a design experience built around your unique vision." 
        };
        if (score <= 105) return { 
            range: "$21,000 – $26,000", 
            tier: "Custom Design — Lush",
            message: "This level unlocks a richer visual narrative — elevated florals, beautifully styled environments, and every tabletop detail considered." 
        };
        if (score <= 125) return { 
            range: "$26,000 – $32,000", 
            tier: "Custom Design — Abundant",
            message: "You're dreaming big and beautifully. This tier supports immersive ceremony scenes and incredibly lush, textured reception environments." 
        };
        if (score <= 145) return { 
            range: "$32,000 – $38,000", 
            tier: "Full Production — Entry",
            message: "You want an environment, not just centerpieces. This allows for introductory full-scale event design, integrating florals with baseline lighting and styling mechanics." 
        };
        if (score <= 170) return { 
            range: "$38,000 – $48,000", 
            tier: "Full Production — Standard",
            message: "You want your guests to walk in and lose their breath. This is full-scale event design — custom installations, lighting, staging, and production working together." 
        };
        if (score <= 195) return { 
            range: "$48,000 – $65,000", 
            tier: "Signature Full Production",
            message: "A comprehensive design partnership. Irene and her production team will orchestrate a multi-layered, visually breathtaking world over your entire event." 
        };
        return { 
            range: "$65,000 – $80,000+", 
            tier: "The Ultimate Experience",
            message: "This is the ultimate expression of your love story. An uncompromising, fully immersive transformation of your venue with elite production scale." 
        };
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        // Here you would normally send the data (and the quiz score/tier) to your backend/CRM
        setTimeout(() => {
            setIsModalOpen(false);
            onBack(); // Return to main site after successful submission
        }, 3000);
    };

    return (
        <div className="min-h-screen w-full bg-background flex flex-col relative">
            {/* Sticky Minimal Nav */}
            <nav className="fixed top-0 left-0 w-full p-6 flex items-center justify-between z-50 bg-background/90 backdrop-blur-sm border-b border-subtleBorder/50">
                <button onClick={onBack} className="flex items-center gap-2 text-textLight hover:text-accent transition-colors font-sans text-sm tracking-widest uppercase">
                    <ArrowLeft className="w-4 h-4" /> Back to Site
                </button>
                <div className="font-serif text-lg tracking-wide hidden md:block text-textLight">
                    Lady Victoria Designs
                </div>
                <div className="w-[100px] md:hidden"></div> {/* Spacer for mobile centering */}
            </nav>

            <main className="flex-1 flex flex-col items-center justify-center py-32 px-6">
                <div className="w-full max-w-2xl mx-auto flex flex-col justify-center min-h-[500px] relative">
                    
                    {typeof step === 'number' && (
                        <>
                            {/* Progress Bar Container */}
                            <div className="w-full mb-12">
                                <div className="flex justify-between font-sans text-xs uppercase tracking-[0.2em] text-mutedText/60 mb-3">
                                    <span>Question {step + 1} of {questions.length}</span>
                                    <span>{Math.round(((step + 1) / questions.length) * 100)}%</span>
                                </div>
                                <div className="w-full h-1 bg-subtleBorder/50 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-accent transition-all duration-500 ease-out rounded-full"
                                        style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-right-4 duration-500 fill-mode-forwards">
                                <h2 className="font-serif text-3xl md:text-5xl text-textLight leading-tight">
                                    {questions[step].question}
                                </h2>

                                <div className="flex flex-col gap-4">
                                    {questions[step].options.map((opt, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleSelection(opt.points)}
                                            className="w-full text-left p-6 rounded-2xl border border-subtleBorder bg-white/50 hover:bg-white hover:border-accent hover:shadow-sm transition-all duration-300 text-textLight font-sans group relative overflow-hidden flex justify-between items-center"
                                        >
                                            <span className="relative z-10 pr-8 text-base md:text-lg">{opt.label}</span>
                                            <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-accent flex-shrink-0" />
                                        </button>
                                    ))}
                                </div>
                                
                                {step > 0 && (
                                    <button 
                                        onClick={handleBack}
                                        className="text-mutedText hover:text-accent transition-colors font-sans text-sm tracking-widest uppercase self-start flex items-center gap-2 mt-4"
                                    >
                                        <ArrowLeft className="w-4 h-4" /> Previous Question
                                    </button>
                                )}
                            </div>
                        </>
                    )}

                    {step === 'results' && isCalculating && (
                        <div className="flex flex-col items-center justify-center text-center gap-8 animate-in fade-in duration-500 absolute inset-0">
                            <div className="w-16 h-16 border-2 border-subtleBorder border-t-accent rounded-full animate-spin"></div>
                            <h3 className="font-serif text-3xl text-textLight animate-pulse">Calculating your personalized estimate...</h3>
                        </div>
                    )}

                    {step === 'results' && !isCalculating && (
                        <div className="flex flex-col items-center text-center gap-8 animate-in fade-in zoom-in-95 duration-700">
                            <div className="w-full bg-white rounded-3xl p-8 md:p-16 shadow-lg border border-subtleBorder relative overflow-hidden">
                                
                                <div className="absolute top-0 left-0 w-full h-2 bg-accent"></div>
                                
                                <div className="text-accent font-sans text-xs tracking-[0.2em] uppercase mb-4">
                                    Your Estimated Investment
                                </div>
                                
                                <div className="font-sans text-5xl md:text-7xl text-textLight mb-4">
                                    {calculateResult().range}
                                </div>
                                
                                <div className="inline-block bg-primaryDark text-white font-sans text-xs tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-8">
                                    {calculateResult().tier}
                                </div>
                                
                                <p className="font-serif text-xl md:text-2xl italic text-textLight max-w-lg mx-auto mb-10 leading-relaxed">
                                    "{calculateResult().message}"
                                </p>
                                
                                <div className="w-full h-[1px] bg-subtleBorder mb-10"></div>
                                
                                <p className="font-sans text-sm text-mutedText max-w-md mx-auto mb-10 italic">
                                    This is an estimate based on your selections. Your final investment will be tailored to your specific vision during your complimentary consultation with Irene.
                                </p>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="w-full sm:w-auto bg-primaryDark text-white px-8 py-4 rounded-full font-sans text-sm tracking-widest uppercase hover:bg-accent hover:text-white transition-colors duration-300"
                                    >
                                        Book Your Consultation
                                    </button>
                                    <button
                                        onClick={onBack}
                                        className="w-full sm:w-auto bg-transparent border border-subtleBorder text-textLight px-8 py-4 rounded-full font-sans text-sm tracking-widest uppercase hover:border-textLight transition-colors duration-300"
                                    >
                                        View Full Guide
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </main>

            {/* Lead Capture Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-primaryDark/60 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => !isSubmitted && setIsModalOpen(false)}
                    />
                    
                    {/* Modal Content */}
                    <div className="relative w-full max-w-lg bg-background rounded-3xl p-8 md:p-12 shadow-2xl animate-in fade-in zoom-in-95 duration-300 overflow-hidden border border-subtleBorder">
                        
                        {!isSubmitted && (
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 text-mutedText hover:text-textLight transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        )}

                        {isSubmitted ? (
                            <div className="text-center py-8 animate-in fade-in zoom-in slide-in-from-bottom-4 duration-500">
                                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <div className="w-4 h-4 bg-accent rounded-full animate-ping absolute opacity-20"></div>
                                    <div className="w-4 h-4 bg-accent rounded-full"></div>
                                </div>
                                <h3 className="font-serif text-3xl text-textLight mb-4">Request Received</h3>
                                <p className="font-sans text-mutedText italic text-lg">
                                    Irene will be in touch shortly to schedule your complimentary consultation.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="text-accent font-sans text-xs tracking-[0.2em] uppercase mb-4 text-center">
                                    Take the Next Step
                                </div>
                                <h3 className="font-serif text-3xl text-textLight text-center mb-2">
                                    Let's Discuss Your Vision
                                </h3>
                                <p className="font-sans text-mutedText text-center mb-8 text-sm italic">
                                    Share your details below and Irene will reach out to schedule your consultation.
                                </p>

                                <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="name" className="font-sans text-xs uppercase tracking-widest text-textLight ml-2">Name</label>
                                        <input 
                                            type="text" 
                                            id="name" 
                                            required
                                            className="w-full bg-white border border-subtleBorder text-textLight px-6 py-4 rounded-2xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-sans"
                                            placeholder="Jane Doe"
                                        />
                                    </div>
                                    
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="email" className="font-sans text-xs uppercase tracking-widest text-textLight ml-2">Email Address</label>
                                        <input 
                                            type="email" 
                                            id="email" 
                                            required
                                            className="w-full bg-white border border-subtleBorder text-textLight px-6 py-4 rounded-2xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-sans"
                                            placeholder="jane@example.com"
                                        />
                                    </div>
                                    
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="date" className="font-sans text-xs uppercase tracking-widest text-textLight ml-2">Wedding Date (Optional)</label>
                                        <input 
                                            type="text" 
                                            id="date" 
                                            className="w-full bg-white border border-subtleBorder text-textLight px-6 py-4 rounded-2xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-sans"
                                            placeholder="MM/DD/YYYY"
                                        />
                                    </div>

                                    <button 
                                        type="submit"
                                        className="w-full mt-4 bg-primaryDark text-white px-8 py-4 rounded-full font-sans text-sm tracking-widest uppercase hover:bg-accent transition-colors duration-300"
                                    >
                                        Request Consultation
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
