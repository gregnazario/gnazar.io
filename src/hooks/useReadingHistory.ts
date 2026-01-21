import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "reading-history";
const MAX_HISTORY = 50;

type ReadingHistoryEntry = {
	slug: string;
	visitedAt: string;
};

function getHistory(): ReadingHistoryEntry[] {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored ? JSON.parse(stored) : [];
	} catch {
		return [];
	}
}

function saveHistory(history: ReadingHistoryEntry[]) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function useReadingHistory() {
	const [visitedSlugs, setVisitedSlugs] = useState<Set<string>>(new Set());
	const [history, setHistory] = useState<ReadingHistoryEntry[]>([]);

	useEffect(() => {
		const stored = getHistory();
		setHistory(stored);
		setVisitedSlugs(new Set(stored.map((h) => h.slug)));
	}, []);

	const markAsRead = (slug: string) => {
		const currentHistory = getHistory();
		const filtered = currentHistory.filter((h) => h.slug !== slug);
		const newHistory = [
			{ slug, visitedAt: new Date().toISOString() },
			...filtered,
		].slice(0, MAX_HISTORY);
		saveHistory(newHistory);
		setHistory(newHistory);
		setVisitedSlugs(new Set(newHistory.map((h) => h.slug)));
	};

	const isRead = (slug: string) => visitedSlugs.has(slug);

	const clearHistory = () => {
		localStorage.removeItem(STORAGE_KEY);
		setVisitedSlugs(new Set());
		setHistory([]);
	};

	return { markAsRead, isRead, clearHistory, visitedSlugs, history };
}

export function useMarkAsRead(slug: string) {
	const hasMarkedRef = useRef<string | null>(null);

	useEffect(() => {
		// Skip if we've already marked this slug as read
		if (hasMarkedRef.current === slug) return;

		const history = getHistory();
		const filtered = history.filter((h) => h.slug !== slug);
		const newHistory = [
			{ slug, visitedAt: new Date().toISOString() },
			...filtered,
		].slice(0, MAX_HISTORY);
		saveHistory(newHistory);
		hasMarkedRef.current = slug;
	}, [slug]);
}
