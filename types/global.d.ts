import { PrismaClient } from '@prisma/client';

declare global {
  namespace globalThis {
    // eslint-disable-next-line no-var
    var prismadb: PrismaClient;
  }

  namespace JSX {
    interface IntrinsicElements {
      'em-emoji': React.DetailedHTMLProps<
        {
          id?: string;
          size: string;
          set: string;
          shortcodes: string;
        },
        HTMLElement
      >;
    }
  }
}
