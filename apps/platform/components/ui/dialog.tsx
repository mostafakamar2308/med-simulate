import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { Modal, View, Pressable, Dimensions } from "react-native";

export interface DialogProps {
  open: boolean;
  className?: string;
  onClose: () => void;
  children: ReactNode;
}
const { height, width } = Dimensions.get("window");

const Dialog: React.FC<DialogProps> = ({ open, onClose, className, children }) => {
  return (
    <Modal visible={open} transparent animationType="fade" statusBarTranslucent>
      <Pressable onPress={onClose} className="flex-1 items-center justify-center bg-black/50">
        <Pressable
          onPress={() => {}}
          style={{
            height: height * 0.9,
            maxHeight: height * 0.9,
            width: width * 0.9,
            maxWidth: width * 0.9,
          }}
          className={cn("overflow-hidden rounded-2xl bg-white", className)}>
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const DialogHeader: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return <View className={className}>{children}</View>;
};

const DialogContent: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return <View className={cn("flex-1", className)}>{children}</View>;
};

const DialogFooter: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return <View className={className}>{children}</View>;
};

export { Dialog, DialogHeader, DialogContent, DialogFooter };
