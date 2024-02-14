import type { Address, Language, LanguageContext, ExpressionUI, Interaction } from "https://esm.sh/@perspect3vism/ad4m@0.5.0";
import { LinkAdapter } from "./linksAdapter.ts";
import { TelepresenceAdapterImplementation } from "./telepresenceAdapter.ts";

function interactions(expression: Address): Interaction[] {
  return [];
}

// Your language name goes here
//!@ad4m-template-variable
export const name = "ad4m-link-language-template";

//!@ad4m-template-variable
const uid = "template-link-languaged-uuid";

export default async function create(context: LanguageContext): Promise<Language> {
  const linksAdapter = new LinkAdapter(context, uid);
  const telepresenceAdapter = new TelepresenceAdapterImplementation(context, uid);

  return {
    name,
    linksAdapter,
    interactions,
    telepresenceAdapter
  } as Language;
}
