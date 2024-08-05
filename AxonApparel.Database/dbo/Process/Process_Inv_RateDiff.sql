CREATE TABLE [dbo].[Process_Inv_RateDiff]
(
	[Process_inv_Rateid] [int] IDENTITY(1,1) NOT NULL,
	[Process_Invid] [int] NULL,
	[proc_recpt_no] [varchar](20) NULL,
	[GrnAmt] [numeric](15, 5) NULL DEFAULT (0.00),
	[InvAmt] [numeric](15, 5) NULL DEFAULT (0.00),
	[RateDiff] [numeric](15, 5) NULL DEFAULT (0.00),
	[Proc_Recpt_detid] [int] NULL,
	[QtyDiff] [numeric](12, 3) NOT NULL DEFAULT (0), 
	[IsChecked] char(1) NULL,
    CONSTRAINT [PK_Process_Inv_RateDiff] PRIMARY KEY ([Process_inv_Rateid]), 
    CONSTRAINT [FK_Process_Inv_RateDiff_Process_Inv_Mas] FOREIGN KEY ([Process_Invid]) REFERENCES [Process_Inv_Mas]([Process_Invid]),
	CONSTRAINT [FK_Process_Inv_RateDiff_Process_recpt_det] FOREIGN KEY ([Proc_Recpt_detid]) REFERENCES [Process_recpt_det]([Proc_Recpt_detid])
)
