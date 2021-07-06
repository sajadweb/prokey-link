export class ProkeyLink {
  private _window: Window | null = null;

  /// This function opens the prokey-link website
  async Connect() {
    const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
                    width=0,height=0,left=-1000,top=-1000`;

    window.open('http://localhost:3000', 'prokey-link', params);
  }
}
