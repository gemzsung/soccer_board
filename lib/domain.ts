export type TeamSide = "home" | "away";

export type Formation = string;

export type Player = {
  id: string;
  name: string;
  number?: number;
  defaultPosition?: string;
};

export type Team = {
  id: string;
  name: string;
  side: TeamSide;
  formation: Formation;
  players: Player[];
};

export type Score = {
  home: number;
  away: number;
};

export type Match = {
  id: string;
  name: string;
  createdAt: string; // ISO
  teams: {
    home: Team;
    away: Team;
  };
  score: Score;
};

export type PitchPoint = {
  /**
   * Normalized coordinates (0..1).
   * x: 0 = left goal line, 1 = right goal line
   * y: 0 = top touch line, 1 = bottom touch line
   */
  x: number;
  y: number;
};

export type QuarterPlayerPosition = {
  playerId: string;
  label: string; // e.g. "ST", "CB"
  point: PitchPoint;
};

export type MatchEvent =
  | {
      id: string;
      type: "goal";
      minute: number;
      side: TeamSide;
      playerId: string;
      assistPlayerId?: string;
      note?: string;
    }
  | {
      id: string;
      type: "substitution";
      minute: number;
      side: TeamSide;
      outPlayerId: string;
      inPlayerId: string;
      note?: string;
    }
  | {
      id: string;
      type: "card";
      minute: number;
      side: TeamSide;
      playerId: string;
      card: "yellow" | "red";
      note?: string;
    }
  | {
      id: string;
      type: "note";
      minute: number;
      side: TeamSide;
      note: string;
    };

export type QuarterSnapshot = {
  matchId: string;
  quarter: number;
  durationMinutes: number;
  score: Score;
  formations: {
    home: Formation;
    away: Formation;
  };
  positions: {
    home: QuarterPlayerPosition[];
    away: QuarterPlayerPosition[];
  };
  events: MatchEvent[];
  updatedAt: string; // ISO
};
