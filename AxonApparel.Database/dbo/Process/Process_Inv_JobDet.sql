CREATE TABLE [dbo].[Process_Inv_JobDet]
(
	[Process_Inv_JobDetID] [int] IDENTITY(1,1) NOT NULL, 
	[Job_Ord_No] [varchar](20) NOT NULL,
	[Process_InvDetid] [int] NOT NULL,
	[Process_Invid] [int] NOT NULL,
	[Process_Recpt_Detid] [int] NOT NULL,
	[Process_Recpt_JobDetid] [int] NOT NULL,
	[InvoiceQty] [numeric](14, 3) NOT NULL DEFAULT (0),
    CONSTRAINT [PK_Process_Inv_JobDet] PRIMARY KEY ([Process_Inv_JobDetID]), 
    CONSTRAINT [FK_Process_Inv_JobDet_Process_Inv_Det] FOREIGN KEY ([Process_InvDetid]) REFERENCES [Process_Inv_Det]([Process_InvDetid]), 
	CONSTRAINT [FK_Process_Inv_JobDet_Process_Inv_Mas] FOREIGN KEY ([Process_Invid]) REFERENCES [Process_Inv_Mas]([Process_Invid]), 
	CONSTRAINT [FK_Process_Inv_JobDet_Process_recpt_det] FOREIGN KEY ([Process_Recpt_Detid]) REFERENCES [Process_recpt_det]([Proc_Recpt_Detid])
)
