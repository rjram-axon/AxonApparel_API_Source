CREATE TABLE [dbo].[Yarn_Plan_ProLoss]
(
	[YPlanLossID] [int] IDENTITY(1,1) NOT NULL, 
	[YPlanDetID] [int] NOT NULL,
	[SlNo] [int] NOT NULL,
	[ProcessId] [int] NOT NULL,
	[Loss_Per] [decimal](5, 2) NOT NULL,
	[FSNo] [int] NOT NULL,
	[CompSNo][int] NULL,
    CONSTRAINT [PK_Yarn_Plan_ProLoss] PRIMARY KEY ([YPlanLossID]),
	CONSTRAINT [FK_Yarn_Plan_ProLoss_Yarn_Plan_Det] FOREIGN KEY ([YPlanDetID]) REFERENCES [Yarn_Plan_Det]([YPlanDetID]),
	CONSTRAINT [FK_Yarn_Plan_ProLoss_Process] FOREIGN KEY ([ProcessId]) REFERENCES [Process]([ProcessId])
)
