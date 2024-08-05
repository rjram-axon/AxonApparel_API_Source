CREATE TABLE [dbo].[Yarn_Plan_ProLoss_Amend]
(
	[YPlanLossAmndId] INT NOT NULL PRIMARY KEY IDENTITY(1,1) ,
	[YPlanLossID] [int]  NULL, 
	[YPlanDetID] [int]  NULL,
	[SlNo] [int] NOT NULL,
	[ProcessId] [int] NOT NULL,
	[Loss_Per] [decimal](5, 2) NOT NULL,
	[FSNo] [int] NOT NULL,
	[CompSNo][int] NULL,
   
	--CONSTRAINT [FK_Yarn_Plan_ProLoss_Yarn_Plan_Det] FOREIGN KEY ([YPlanDetID]) REFERENCES [Yarn_Plan_Det]([YPlanDetID]),
	CONSTRAINT [FK_Yarn_Plan_ProLoss_am_Process] FOREIGN KEY ([ProcessId]) REFERENCES [Process]([ProcessId])
)
