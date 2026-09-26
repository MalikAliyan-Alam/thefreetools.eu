# Adding a tool

1. **Pick it from research.** Check `docs/research/keyword-research-master.csv` for the target keyword per language, volume and KD.
2. **Engine** — `src/tools/<id>/engine.ts`. Pure functions only. Write `tests/<id>.test.ts` with worked examples you verified by hand, including rounding edge cases. Run `pnpm test`.
3. **Component** — `src/tools/<id>/<Name>Tool.tsx` and `<id>.css` (import the CSS inside the component). Reuse the shared classes in `global.css`: `.input`, `.btn`, `.btn-ghost`, `.chip`, `.segmented`, `.fold`, `.two`.
   - Results update as the user types; no "Calculate" button.
   - Offer "Try an example", "Clear", copy and share-link where it makes sense.
   - Save state to `localStorage` under `tft:<id>:v1:<locale>` inside try/catch.
4. **Labels type** — `src/tools/<id>/labels.ts`.
5. **Content** — `src/tools/<id>/content/<locale>.ts` for each language. Slug = the local search phrase. Sections: how it works (formula), worked example, local rules/table, FAQ (4–6 real questions). Set `updated`.
6. **Register** — add to `TOOLS` in `src/tools/registry.ts`, add a line to `src/components/ToolIsland.astro`, add an icon case in `src/components/ToolIcon.astro`.
7. **Check** — `pnpm build`, `npx astro check`, then run the `tool-tester`, `mobile-checker`, `seo-auditor` and `perf-auditor` agents.
