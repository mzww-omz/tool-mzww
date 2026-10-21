import type { Component } from 'svelte';
export type ToolState = Record<string, any>;
export interface ToolDefinition {
 id: string; number: string; name: string; english: string; description: string;
 categories: string[]; aliases: string[];
 load: () => Promise<{default: Component<{state: ToolState}>}>;
}
