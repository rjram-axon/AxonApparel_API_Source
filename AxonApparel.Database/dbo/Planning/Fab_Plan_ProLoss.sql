CREATE TABLE [dbo].[Fab_Plan_ProLoss]
(
    [FLPlanID] [int] IDENTITY(1,1) NOT NULL, 
	[FPlanId] [int] NOT NULL,
	[SlNo] [int] NOT NULL,
	[ProcessId] [int] NOT NULL,
	[Loss_Per] [decimal](5, 2) NOT NULL, 
	[CompSlNo] [int] NOT NULL,
	[GColorId] [int] NULL,
	[FLBColorId] [int] NULL,
	[FLFColorId] [int] NULL,
	[FLItemId] [int] NULL,
    CONSTRAINT [FK_Fab_Plan_ProLoss_Process] FOREIGN KEY ([ProcessId]) REFERENCES [Process]([ProcessId]),
	CONSTRAINT [FK_Fab_Plan_ProLoss_Fabric_Plan] FOREIGN KEY ([FPlanId]) REFERENCES [Fabric_Plan]([FPlanId]), 
    CONSTRAINT [PK_Fab_Plan_ProLoss] PRIMARY KEY ([FLPlanID])
)
