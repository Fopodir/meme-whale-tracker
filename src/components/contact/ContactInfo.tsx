
import { ExternalLink, Github, Twitter } from "lucide-react";

export const ContactInfo = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Connect With Me</h2>
      <div className="space-y-4">
        <a 
          href="https://t.me/cryptokingmax"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-card border border-muted rounded-lg p-6 flex items-center hover:border-glow-green/50 transition-colors "
        >
          <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
            <svg className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.2581 2.99006C21.9757 2.74329 21.6271 2.58388 21.2553 2.5297C20.8834 2.47552 20.5023 2.52888 20.1581 2.68006C18.0181 3.50418 6.8261 8.07533 2.7601 9.72006C2.43235 9.85609 2.14201 10.0787 1.92536 10.3658C1.7087 10.6528 1.57397 10.9941 1.5361 11.3529C1.49824 11.7118 1.55892 12.0747 1.71232 12.3976C1.86572 12.7205 2.10651 12.9916 2.4061 13.1801C3.3781 13.8001 5.7541 14.9801 5.7541 14.9801C5.7541 14.9801 6.8501 18.8101 7.4201 20.6101C7.55553 21.0088 7.81271 21.3533 8.15398 21.5895C8.49525 21.8258 8.9014 21.9411 9.3141 21.9151C9.64345 21.8811 9.95826 21.7643 10.2237 21.5771C10.4891 21.39 10.6965 21.1387 10.8261 20.8501L13.2021 16.9201" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.2021 16.9201L20.9341 9.84006C21.0414 9.74135 21.1198 9.61665 21.1612 9.47763C21.2027 9.33861 21.206 9.19094 21.1707 9.05006C21.1355 8.90918 21.0627 8.78071 20.9599 8.67722C20.857 8.57373 20.7274 8.49929 20.5861 8.46006L5.7541 14.9801L9.4561 16.0001L12.0001 21.0001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h3 className="font-medium mb-1">Telegram</h3>
            <p className="text-sm text-gray-400">@cryptokingmax</p>
          </div>
          <ExternalLink className="ml-auto h-5 w-5 text-gray-400" />
        </a>
        <a 
          href="https://discord.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-card border border-muted rounded-lg p-6 flex items-center hover:border-glow-green/50 transition-colors "
        >
          <div className="h-12 w-12 rounded-full bg-indigo-500/20 flex items-center justify-center mr-4">
            <svg className="h-6 w-6 text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" fill="currentColor"/>
            </svg>
          </div>
          <div>
            <h3 className="font-medium mb-1">Discord</h3>
            <p className="text-sm text-gray-400">@cryptokingmax</p>
          </div>
          <ExternalLink className="ml-auto h-5 w-5 text-gray-400" />
        </a>
        
        <a 
          href="https://twitter.com/crytokingmax"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-card border border-muted rounded-lg p-6 flex items-center hover:border-glow-green/50 transition-colors "
        >
          <div className="h-12 w-12 rounded-full bg-blue-400/20 flex items-center justify-center mr-4">
            <Twitter className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Twitter</h3>
            <p className="text-sm text-gray-400">@crytokingmax</p>
          </div>
          <ExternalLink className="ml-auto h-5 w-5 text-gray-400" />
        </a>
        
        <a 
          href="https://github.com/cryptoking-max"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-card border border-muted rounded-lg p-6 flex items-center hover:border-glow-green/50 transition-colors "
        >
          <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
            <Github className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h3 className="font-medium mb-1">GitHub</h3>
            <p className="text-sm text-gray-400">cryptoking-max</p>
          </div>
          <ExternalLink className="ml-auto h-5 w-5 text-gray-400" />
        </a>
      </div>
    </div>
  );
};
