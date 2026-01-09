export type Feedback = {
  score: number;
  correctDecision: string;
  details: {
    history: {
      actionsTaken: string[];
      actionsMissed: string[];
    };
    examination: {
      actionsTaken: string[];
      actionsMissed: string[];
    };
    investigation: {
      actionsTaken: string[];
      actionsMissed: string[];
      actionsUnnecessary: string[];
    };
    consultation: {
      actionsTaken: string[];
      actionsMissed: string[];
      actionsUnnecessary: string[];
    };
    treatment: {
      actionsTaken: string[];
      actionsMissed: string[];
      actionsUnnecessary: string[];
    };
  };
};
