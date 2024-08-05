CREATE TABLE [dbo].[Fab_Plan_ProLoss_Amend]
(
	[FLPlanAmndId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[FLPlanID] [int]  NULL, 
	[FPlanId] [int] NULL,
	[SlNo] [int] NULL,
	[ProcessId] [int] NOT NULL,
	[Loss_Per] [decimal](5, 2) NOT NULL, 
	[CompSlNo] [int] NULL,
    CONSTRAINT [FK_Fab_Plan_am_ProLoss_Process] FOREIGN KEY ([ProcessId]) REFERENCES [Process]([ProcessId]),
	--CONSTRAINT [FK_Fab_Plan_ProLoss_Fabric_Plan] FOREIGN KEY ([FPlanId]) REFERENCES [Fabric_Plan]([FPlanId]), 
    
)
