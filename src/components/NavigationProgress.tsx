/** Thin bar along the top edge while a client-side navigation is loading. */
export default function NavigationProgress({ pending }: { pending: boolean }) {
	if (!pending) {
		return null;
	}

	return <div className="nav-progress" aria-hidden="true" />;
}
