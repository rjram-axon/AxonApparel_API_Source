CREATE TABLE [dbo].[Process_Tolerance]
(
	  [ToleranceId] INT IDENTITY(1,1) NOT NULL, 
	  [ProcessId] [int] NULL,
	 [IsPercent] [char](1) NULL,
	 [Percentage] [numeric](10, 2) NOT NULL DEFAULT (0.00),
	 [Quantity] [numeric](15, 3) NOT NULL DEFAULT (0.00), 
    CONSTRAINT [PK_Process_Tolerance] PRIMARY KEY ([ToleranceId]), 
    CONSTRAINT [FK_Process_Tolerance_Process] FOREIGN KEY ([ProcessId]) REFERENCES [Process]([ProcessId])
)
