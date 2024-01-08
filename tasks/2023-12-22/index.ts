export interface TextProcessingPlugin {
  process(text: string): string;
}

export class TextProcessor {
  private plugins: TextProcessingPlugin[] = [];

  use(plugin: TextProcessingPlugin): void {
    this.plugins.push(plugin);
  }

  process(text: string): string {
    return this.plugins.reduce((processedText, plugin) => {
      return plugin.process(processedText);
    }, text);
  }
}

export class RemoveWordsPlugin implements TextProcessingPlugin {
  constructor(private wordsToRemove: string[]) {}
  process(text: string): string {
    return this.wordsToRemove.reduce((processedText, word) => {
      return processedText.replace(
        new RegExp(`\\s*\\b${word}\\b\\s*`, "g"),
        " "
      );
    }, text);
  }
}

export class ReplaceCharsPlugin implements TextProcessingPlugin {
  constructor(private charsToReplace: Record<string, string>) {}

  process(text: string): string {
    return Object.keys(this.charsToReplace).reduce((processedText, char) => {
      const regex = new RegExp(char, "gi");
      return processedText.replace(regex, this.charsToReplace[char]);
    }, text);
  }
}

export class MarkdownToHtmlPlugin implements TextProcessingPlugin {
  process(text: string): string {
    text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    text = text.replace(/_([^_]+)_| \*([^*]+)\*/g, "<em>$1$2</em>");
    text = text.replace(/### (.*?)/g, "<h3>$1</h3>");
    text = text.replace(/## (.*?)/g, "<h2>$1</h2>");
    text = text.replace(/# (.*?)/g, "<h1>$1</h1>");

    return text;
  }
}
