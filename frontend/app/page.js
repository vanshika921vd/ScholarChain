"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { connectWallet, getChainId, switchToSepolia } from "../lib/web3";
import { api } from "../lib/api";

const MISSION_GOALS_ETH = [5, 3, 7];

const baseMissions = [
	{
		key: "education",
		title: "Education for All",
		description: "Support scholarships for underprivileged students pursuing higher education.",
		image: "/mission-education.jpg",
		taxBenefit: true
	},
	{
		key: "skills",
		title: "Skill Development",
		description: "Empower youth with vocational training and skill development programs.",
		image: "/mission-skills.jpg",
		taxBenefit: true
	},
	{
		key: "healthcare",
		title: "Healthcare Access",
		description: "Provide medical assistance and healthcare support to needy families.",
		image: "/mission-health.jpg",
		taxBenefit: true
	},
];

export default function Home() {
	const [account, setAccount] = useState("");
	const [network, setNetwork] = useState("");
	const [summaryByProgram, setSummaryByProgram] = useState({});

	useEffect(() => {
		(async () => {
			try {
				if (!window.ethereum) return;
				const chainId = await getChainId();
				setNetwork(String(chainId));
				const accounts = await window.ethereum.request({ method: "eth_accounts" });
				if (accounts?.[0]) setAccount(accounts[0]);
			} catch {
				// ignore
			}
		})();
	}, []);

	useEffect(() => {
		(async () => {
			try {
				const res = await api.get("/donate/summary");
				setSummaryByProgram(res.data?.summary || {});
			} catch {
				setSummaryByProgram({});
			}
		})();
	}, []);

	const onConnect = async () => {
		try {
			await switchToSepolia();
			const acc = await connectWallet();
			setAccount(acc);
			const chainId = await getChainId();
			setNetwork(String(chainId));
		} catch (e) {
			alert(e.message || "Failed to connect");
		}
	};

	const missions = baseMissions.map((mission, idx) => {
		const goalEth = MISSION_GOALS_ETH[idx] || 1;
		const programSummary = summaryByProgram[mission.key] || { totalWei: "0", donationsCount: 0 };
		const raisedEth = Number(ethers.formatEther(programSummary.totalWei || "0"));
		const percentage = goalEth > 0 ? Math.min(100, (raisedEth / goalEth) * 100) : 0;
		return {
			...mission,
			raised: `${raisedEth.toFixed(4)} ETH`,
			goal: `${goalEth.toFixed(2)} ETH`,
			percentage: Number(percentage.toFixed(1)),
			donations: Number(programSummary.donationsCount || 0)
		};
	});

	return (
		<div className="min-h-screen bg-white text-slate-900 dark:bg-[#05080c] dark:text-slate-100">
			<Navbar account={account} onConnectWallet={onConnect} network={network} />

			<main className="pt-16">
				{/* Hero Section */}
					<section className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 py-20 px-4">
					<div className="max-w-6xl mx-auto">
						<div className="text-center">
							<h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
								India{"'"}s Most Trusted
								<span className="block text-blue-600 dark:text-blue-400">Scholarship Platform</span>
							</h1>
							<p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
								Transparent scholarship distribution powered by blockchain.
								Every rupee tracked, every student verified, every donation impactful.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
								<Link href="/donate">
									<button className="btn-primary px-8 py-4 text-lg">
										Start Donating
									</button>
								</Link>
								<Link href="/students">
									<button className="btn-primary px-8 py-4 text-lg">
										View Students
									</button>
								</Link>
							</div>
							<div className="text-6xl text-blue-600 dark:text-blue-400">🎓</div>
						</div>

						<div className="grid gap-6 mt-16 md:grid-cols-3">
							{missions.map((mission) => (
								<div key={mission.title} className="rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/80">
									<div className="flex items-center justify-between mb-2">
										<h3 className="text-xl font-semibold text-gray-900 dark:text-white">{mission.title}</h3>
										{mission.taxBenefit && (
											<span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full">
												Tax Benefit
											</span>
										)}
									</div>
									<p className="text-gray-600 dark:text-gray-300 mb-4">{mission.description}</p>

									<div className="mb-4">
										<div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
											<span>{mission.raised} raised</span>
											<span>{mission.goal}</span>
										</div>
										<div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
											<div
												className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-500"
												style={{ width: `${mission.percentage}%` }}
											></div>
										</div>
										<div className="text-right text-sm text-gray-500 dark:text-gray-400 mt-1">
											{mission.percentage}% funded
										</div>
									</div>

									<div className="flex justify-between items-center">
										<span className="text-sm text-gray-500 dark:text-gray-400">{mission.donations} donations</span>
										<Link href={`/donate?program=${mission.key}`} className="inline-flex">
											<button className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
												Donate Now
											</button>
										</Link>
									</div>
								</div>
							))}
						</div>

					</div>
				</section>
				{/* Trust Section */}
				<section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
					<div className="max-w-6xl mx-auto">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose ScholarChain?</h2>
						</div>

						<div className="grid md:grid-cols-3 gap-8">
							<div className="text-center">
								<div className="w-16 h-16 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
									<span className="text-2xl text-blue-600 dark:text-blue-400">🔒</span>
								</div>
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Blockchain Transparency</h3>
								<p className="text-gray-600 dark:text-gray-300">Every transaction is recorded on the blockchain, ensuring complete transparency and accountability.</p>
							</div>
							<div className="text-center">
								<div className="w-16 h-16 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
									<span className="text-2xl text-blue-600 dark:text-blue-400">✅</span>
								</div>
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Verified Students</h3>
								<p className="text-gray-600 dark:text-gray-300">All scholarship recipients are thoroughly verified to ensure funds reach those who need them most.</p>
							</div>
							<div className="text-center">
								<div className="w-16 h-16 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
									<span className="text-2xl text-blue-600 dark:text-blue-400">💰</span>
								</div>
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Tax Benefits</h3>
								<p className="text-gray-600 dark:text-gray-300">Donations qualify for tax deductions under Section 80G, maximizing your social impact.</p>
							</div>
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="bg-blue-600 dark:bg-blue-700 py-16 px-4">
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="text-3xl font-bold text-white mb-4">
							Ready to Make a Difference?
						</h2>
						<p className="text-blue-100 dark:text-blue-200 mb-8 text-lg">
							Join thousands of donors who are transforming lives through transparent scholarship funding.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link href="/donate">
								<button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
									Start Donating Today
								</button>
							</Link>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
