CREATE TABLE [dbo].[Process_Inv_Dc]
(
	[Process_Inv_DcId] [int] IDENTITY(1,1) NOT NULL,
	[Process_invid] [int] NULL,
	[proc_recpt_masid] [int] NULL, 
    CONSTRAINT [PK_Process_Inv_Dc] PRIMARY KEY ([Process_Inv_DcId]), 
    CONSTRAINT [FK_Process_Inv_Dc_Process_Inv_Mas] FOREIGN KEY ([Process_invid]) REFERENCES [Process_Inv_Mas]([Process_Invid]),
	CONSTRAINT [FK_Process_Inv_Dc_Process_Recpt_Mas] FOREIGN KEY ([proc_recpt_masid]) REFERENCES [Process_Recpt_Mas]([proc_recpt_masid])
)
