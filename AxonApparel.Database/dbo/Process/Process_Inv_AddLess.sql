CREATE TABLE [dbo].[Process_Inv_AddLess]
(
	[Process_Invid] [int] NULL,
	[Process_Inv_AddLessid] [int] IDENTITY(1,1) NOT NULL,
	[AddLessid] [int] NULL,
	[Percentage] [numeric](5, 2) NULL,
	[Amount] [numeric](15, 5) NULL, 
    CONSTRAINT [PK_Process_Inv_AddLess] PRIMARY KEY ([Process_Inv_AddLessid]), 
    CONSTRAINT [FK_Process_Inv_AddLess_Process_inv_mas] FOREIGN KEY ([Process_Invid]) REFERENCES [Process_inv_mas]([Process_Invid])
)
